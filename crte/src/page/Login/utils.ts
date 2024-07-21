import { RuleObject, StoreValue } from 'rc-field-form/lib/interface'

type Validator = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void,
) => Promise<void | any> | void

// eslint-disable-next-line import/prefer-default-export
export const validatePassword: Validator = (rule, value) => {
  if (!value?.length) {
    return Promise.resolve()
  }
  if (!/^[^\\s]*$/.test(value)) {
    return Promise.reject()
  }

  if (value.length < 8) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('密码长度至少为 8 个字符')
  }

  let hasUpperCase = false
  let hasLowerCase = false
  let hasNumber = false

  for (let i = 0; i < value.length; i++) {
    const char = value[i]
    if (char >= 'A' && char <= 'Z') {
      hasUpperCase = true
    } else if (char >= 'a' && char <= 'z') {
      hasLowerCase = true
    } else if (char >= '0' && char <= '9') {
      hasNumber = true
    }
  }

  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(
      '密码必须包含至少一个大写字母、一个小写字母和一个数字',
    )
  }

  return Promise.resolve()
}
