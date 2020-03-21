const Config = use('Config')
const { dictionary } = Config.get('dictionary')
/*
REMEMBER TO KEEP CODE AS UNIQUE EM SEQUENTIAL
*/
module.exports = {
    errors: {
        defaults: {
            NOT_DEFINED: what =>
                (() => {
                    return {
                        code: 1,
                        en: `${what} not defined in request`,
                        prBr: `${what} da requisição não definida`,
                    }
                })(what),
            NOT_FOUND: type =>
                (() => {
                    return {
                        code: 2,
                        en: `Requested ${dictionary[type].en} not found`,
                        prBr: `${dictionary[type].prBr} solicitada não encontrada`,
                    }
                })(type),
        },
        constants: {
            NOT_DEFINED: {
                code: 3,
                en: `Type of constants not defined in request`,
                prBr: `Constante da requisição não definida`,
            },
            NOT_FOUND: {
                code: 4,
                en: `Requested constant's type not found`,
                prBr: `Constante solicitada não encontrada`,
            },
        },
    },
}