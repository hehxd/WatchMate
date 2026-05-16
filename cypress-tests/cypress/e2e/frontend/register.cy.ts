import { RegisterMethods } from '../../pageObjects/frontend/register/register.methods'

describe('Frontend Register Tests', () => {
    const timestamp = Date.now().toString().slice(-6)
    const email = `testuser_${timestamp}@watchmate.com`
    const username = `user_${timestamp}`
    const password = 'test1234'
    const register = new RegisterMethods()

    it('Should register successfully with valid data', () => {
        register.navigateToRegister()
        register.register(username, email, password, password)
        register.verifyRegisterSuccess()
    })

    it('Should show error when passwords do not match', () => {
        register.navigateToRegister()
        register.register(username, email, password, 'wrongpassword')
        register.verifyPasswordMismatchError()
    })

    it('Should show error when email already in use', () => {
        // Try registering with same email again
        register.navigateToRegister()
        register.register(username, email, password, password)
        register.verifyRegisterError()
    })
})