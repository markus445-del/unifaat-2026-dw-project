export default {
    key: 'SlowHttpJob',

    /**
     * Executa o processamento lento que antes estava no controlador.
     * data pode conter parâmetros opcionais se necessário.
     */
    async handle({ data }) {
        // importa util sleep (usa segundos conforme util do projeto)
        const { sleep } = await import('../../utils/sleep.js');

        const info = data && data.info ? data.info : null;
        console.log('[SlowHttpJob] iniciando tarefa lenta', info ? info : '');

        // parte lenta (mesma lógica que estava no controlador)
        await sleep(5);

        console.log('[SlowHttpJob] tarefa lenta finalizada', info ? info : '');
    }
};