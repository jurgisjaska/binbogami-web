import { test, expect } from '@playwright/test'
import { FIXTURE_USERS, FIXTURE_PASSWORD } from './fixtures/users.js'

test.describe('Sign In Flow with Backend Fixtures', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin')
    await page.evaluate(() => localStorage.clear())
  })

  test('should render the sign in form with all elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sign In to your account' })).toBeVisible()
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible()
    await expect(page.getByText('Sign In with Google')).toBeVisible()
    await expect(page.getByText('Sign In with X')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible()
  })

  test('should navigate to forgot password page when link is clicked', async ({ page }) => {
    await page.getByRole('link', { name: 'Forgot password?' }).click()
    await expect(page).toHaveURL(/\/forgot-password/)
  })

  test('should navigate to sign up page when link is clicked', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign Up' }).click()
    await expect(page).toHaveURL(/\/signup/)
  })

  test('should successfully sign in active admin fixture user (Jack O\'Neil) and redirect to dashboard', async ({ page }) => {
    const user = FIXTURE_USERS.JACK_ONEIL
    let requestPayload = null

    await page.route('**/auth/signin', async (route) => {
      const request = route.request()
      if (request.method() === 'PUT') {
        requestPayload = JSON.parse(request.postData())
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              token: 'mock-jwt-token-jack-oneil',
              user
            }
          })
        })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Email').fill(user.email)
    await page.getByPlaceholder('Password').fill(FIXTURE_PASSWORD)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()

    expect(requestPayload).toEqual({
      email: user.email,
      password: FIXTURE_PASSWORD
    })

    await expect(page).toHaveURL(/\/dashboard/)

    const savedToken = await page.evaluate(() => localStorage.getItem('binbogami_token'))
    expect(savedToken).toBe('mock-jwt-token-jack-oneil')

    const savedUser = await page.evaluate(() => localStorage.getItem('binbogami_user'))
    expect(JSON.parse(savedUser)).toEqual(user)
  })

  test('should successfully sign in active fixture user (Samantha Carter) and redirect to dashboard', async ({ page }) => {
    const user = FIXTURE_USERS.SAMANTHA_CARTER

    await page.route('**/auth/signin', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              token: 'mock-jwt-token-samantha-carter',
              user
            }
          })
        })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Email').fill(user.email)
    await page.getByPlaceholder('Password').fill(FIXTURE_PASSWORD)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()

    await expect(page).toHaveURL(/\/dashboard/)

    const savedUser = await page.evaluate(() => localStorage.getItem('binbogami_user'))
    expect(JSON.parse(savedUser).position).toBe('Major')
  })

  test('should successfully sign in active fixture user (Teal\'c) and redirect to dashboard', async ({ page }) => {
    const user = FIXTURE_USERS.TEALC

    await page.route('**/auth/signin', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              token: 'mock-jwt-token-tealc',
              user
            }
          })
        })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Email').fill(user.email)
    await page.getByPlaceholder('Password').fill(FIXTURE_PASSWORD)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()

    await expect(page).toHaveURL(/\/dashboard/)
  })

  test('should redirect unconfirmed fixture user (Daniel Jackson) to wait page', async ({ page }) => {
    const user = FIXTURE_USERS.DANIEL_JACKSON

    await page.route('**/auth/signin', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              token: 'mock-jwt-token-daniel-jackson',
              user
            }
          })
        })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Email').fill(user.email)
    await page.getByPlaceholder('Password').fill(FIXTURE_PASSWORD)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()

    await expect(page).toHaveURL(/\/wait/)
  })

  test('should display error alert for deleted fixture user (Jonas Quinn)', async ({ page }) => {
    const user = FIXTURE_USERS.JONAS_QUINN

    await page.route('**/auth/signin', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'User account has been deleted'
          })
        })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Email').fill(user.email)
    await page.getByPlaceholder('Password').fill(FIXTURE_PASSWORD)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()

    const alert = page.locator('.alert-danger')
    await expect(alert).toBeVisible()
    await expect(alert).toHaveText('User account has been deleted')
    await expect(page).toHaveURL(/\/signin/)
  })

  test('should display error message on invalid password for active fixture user', async ({ page }) => {
    const user = FIXTURE_USERS.JACK_ONEIL

    await page.route('**/auth/signin', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Invalid email or password'
          })
        })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Email').fill(user.email)
    await page.getByPlaceholder('Password').fill('incorrect-password')
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()

    const alert = page.locator('.alert-danger')
    await expect(alert).toBeVisible()
    await expect(alert).toHaveText('Invalid email or password')
    await expect(page).toHaveURL(/\/signin/)
  })

  test('should submit form when pressing Enter key in password field', async ({ page }) => {
    const user = FIXTURE_USERS.JACK_ONEIL

    await page.route('**/auth/signin', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              token: 'mock-jwt-token-enter',
              user
            }
          })
        })
      } else {
        await route.continue()
      }
    })

    await page.getByPlaceholder('Email').fill(user.email)
    await page.getByPlaceholder('Password').fill(FIXTURE_PASSWORD)
    await page.getByPlaceholder('Password').press('Enter')

    await expect(page).toHaveURL(/\/dashboard/)
  })
})
