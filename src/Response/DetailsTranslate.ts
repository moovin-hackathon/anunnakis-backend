import camelCase from 'camelcase'

export class DetailsTranslate {

  /**
   * Retorna os detalhes traduzidos com as mensagens padrão e código para cada detalhe.
   *
   * @param fields string[]
   *
   * @return IDetail[]
   */
  public static getDetails (fields: string[]): IDetail[] {
    const details = []
    for (let i in fields) {
      details.push(DetailsTranslate.getDetail(fields[i]))
    }

    return details
  }

  /**
   * Retorna o detalhe gerado para o campo.
   *
   * @param field string
   *
   * @return IDetail
   */
  public static getDetail (field: string): IDetail {

    const errorType = DetailsTranslate.getDetailType(field)
    const fieldsError = field.replace(`_${errorType.code}`, '').split('.')

    for (const i in fieldsError) {
      fieldsError[i] = camelCase(fieldsError[i])
    }

    const fields = fieldsError.join('.')

    const message = DetailsTranslate
      .getMessageByDetailType(errorType.code)
      .replace('$field', fields)

    return {
      id: `${fields}.${camelCase(errorType.label)}`,
      message: message
    }
  }

  /**
   * Retorna a mensagem de detalhe de acordo com o tipo de detalhe.
   *
   * @param detailTypeLabel DetailType
   *
   * @return string
   */
  private static getMessageByDetailType (detailTypeLabel: string): string {
    return DetailTypeMessage[detailTypeLabel] || DetailTypeMessage['REGEXP']
  }

  /**
   * Retorna o tipo de detalhe.
   *
   * @param field string
   *
   * @return DetailType
   */
  private static getDetailType (field: string): DetailType {
    const code: string = field.split('_')[field.split('_').length - 1]

    let label = DetailTypeLabel[code]
    if (DetailTypeLabel[code] === undefined) {
      label = DetailTypeLabel['REGEXP']
    }

    return {
      code,
      label
    }
  }
}

export interface DetailType {
  code: string
  label: DetailTypeLabel
}

export enum DetailTypeLabel {
  UNIQUE = 'UNIQUE',
  REGEXP = 'INVALID',
  REQUIRED = 'REQUIRED',
  NOTFOUND = 'NOTFOUND',
  HASASSOCIATION = 'HASASSOCIATION'
}

enum DetailTypeMessage {
  UNIQUE = 'Field $field must be unique.',
  REGEXP = 'Field $field is invalid.',
  REQUIRED = 'Field $field is required.',
  NOTFOUND = 'Field $field is not found.',
  HASASSOCIATION = 'Field $field has a association.'
}

export interface IDetail {
  id: string
  message: string
}