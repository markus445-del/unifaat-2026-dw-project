import assert from 'node:assert'

// Função de exemplo para testar
function sum(a, b) {
    return a + b
}

function multiply(a, b) {
    return a * b
}

function isEven(num) {
    return num % 2 === 0
}

// Suite de testes
export default {
    name: 'Example Tests',

    async run() {
        const tests = [
            {
                name: 'sum: 2 + 3 deve ser 5',
                fn: () => {
                    const result = sum(2, 3)
                    assert.strictEqual(result, 5, 'Soma incorreta')
                }
            },
            {
                name: 'multiply: 4 * 5 deve ser 20',
                fn: () => {
                    const result = multiply(4, 5)
                    assert.strictEqual(result, 20, 'Multiplicação incorreta')
                }
            },
            {
                name: 'isEven: 4 deve ser par',
                fn: () => {
                    const result = isEven(4)
                    assert.strictEqual(result, true, 'Deveria ser par')
                }
            },
            {
                name: 'isEven: 5 não deve ser par',
                fn: () => {
                    const result = isEven(5)
                    assert.strictEqual(result, false, 'Não deveria ser par')
                }
            }
        ]

        let passed = 0
        let failed = 0

        for (const test of tests) {
            try {
                await test.fn()
                console.log(`✓ ${test.name}`)
                passed++
            } catch (error) {
                console.error(`✗ ${test.name}`)
                console.error(`  ${error.message}`)
                failed++
            }
        }

        console.log(`\nResultado: ${passed} passou, ${failed} falhou`)

        return failed === 0
    }
}
