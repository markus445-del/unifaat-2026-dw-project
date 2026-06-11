import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export default {
    name: 'test',
    description: 'Executa os testes da aplicação',

    async handle() {
        const testsPath = path.resolve('tests')

        try {
            await fs.access(testsPath)
        } catch {
            console.log('Nenhum diretório de testes encontrado.')
            process.exit(0)
        }

        const files = await fs.readdir(testsPath)

        const testFiles = files
            .filter(file => file.endsWith('.test.js'))
            .sort()

        if (testFiles.length === 0) {
            console.log('Nenhum teste encontrado em ./tests')
            process.exit(0)
        }

        console.log(`Executando ${testFiles.length} arquivo(s) de teste...\n`)

        let totalPassed = 0
        let totalFailed = 0

        for (const file of testFiles) {
            const filePath = path.resolve(testsPath, file)
            const testModule = await import(pathToFileURL(filePath).href)

            const testSuite = testModule.default

            if (!testSuite || typeof testSuite.run !== 'function') {
                console.warn(`⚠ ${file} não exporta uma função run()`)
                continue
            }

            console.log(`\n📋 ${testSuite.name || file}`)
            console.log('─'.repeat(50))

            try {
                const success = await testSuite.run()

                if (!success) {
                    totalFailed++
                } else {
                    totalPassed++
                }
            } catch (error) {
                console.error(`Erro ao executar ${file}:`)
                console.error(error.message)
                totalFailed++
            }
        }

        console.log('\n' + '='.repeat(50))
        console.log(`✓ ${totalPassed} suite(s) passou`)
        console.log(`✗ ${totalFailed} suite(s) falhou`)
        console.log('='.repeat(50))

        process.exit(totalFailed > 0 ? 1 : 0)
    }
}