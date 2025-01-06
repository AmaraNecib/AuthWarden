# AuthWarden

**AuthWarden** is a lightweight and secure library for handling authentication in Node.js applications. It provides utilities for generating and verifying JSON Web Tokens (JWT), checking user roles and permissions, and extracting data from tokens.

---

## Features

- **Token Generation:** Generate access and refresh tokens with customizable expiration times.
- **Token Verification:** Verify tokens and handle invalid or expired tokens gracefully.
- **Role-Based Access Control (RBAC):** Check if a user has a specific role.
- **Permission Checks:** Verify if a user has a specific permission.
- **Token Payload Extraction:** Extract specific fields from the token payload.
- **Expiration Check:** Get the expiration time of a token.

---

## Installation

Install the library using npm:


```bash
npm install authwarden
```
Or using yarn:

```bash
yarn add authwarden
```
Or using pnpm:
```bash
pnpm install authwarden
```
---

## Usage

### 1. Configuration

Set up your environment variables in a `.env` file or directly in your environment:

```env
AUTHWARDEN_KEY=your-secret-key
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

### 2. Generate Tokens
```ts
import { generateAccessToken, generateRefreshToken } from 'authwarden';

const payload = {
  userId: 123,
  role: 'admin',
  permissions: ['read:users', 'write:users'],
};

const accessToken = generateAccessToken(payload);
const refreshToken = generateRefreshToken(payload);

console.log('Access Token:', accessToken);
console.log('Refresh Token:', refreshToken);
```
### 3. Verify Tokens
```ts
import { verifyToken } from 'authwarden';

const token = 'your-jwt-token';
const result = verifyToken(token);

if (result.valid) {
  console.log('Token is valid:', result.payload);
} else {
  console.error('Token is invalid:', result.error);
}
```

### 4. Check Roles and Permissions

```ts
import { hasRole, hasPermission } from 'authwarden';

const token = 'your-jwt-token';

if (hasRole(token, 'admin')) {
  console.log('User has the admin role.');
}

if (hasPermission(token, 'write:users')) {
  console.log('User has the write:users permission.');
}
```

### 5. Extract Data from Tokens

```ts
import { getFromToken } from 'authwarden';

const token = 'your-jwt-token';
const userId = getFromToken<number>(token, 'userId');

console.log('User ID:', userId);
```
### 6. Check Token Expiration
```ts
import { getTokenExpiration } from 'authwarden';

const token = 'your-jwt-token';
const expirationTime = getTokenExpiration(token);

if (expirationTime) {
  console.log('Token expires at:', new Date(expirationTime * 1000));
} else {
  console.error('Token is invalid or expired.');
}
```


---

## API Reference

### `generateAccessToken(payload: TokenPayload): string`
Generates an access token with the provided payload.

### `generateRefreshToken(payload: TokenPayload): string`
Generates a refresh token with the provided payload.

### `verifyToken(token: string): { valid: boolean; payload?: JwtPayload | string; error?: string }`
Verifies the token and returns its payload if valid.

### `hasRole(token: string, roles: string | string[]): boolean`
Checks if the user has the specified role(s).

### `hasPermission(token: string, permission: string): boolean`
Checks if the user has the specified permission.

### `getFromToken<T = any>(token: string, field: string): T | undefined`
Extracts a specific field from the token payload.

### `getTokenExpiration(token: string): number | undefined`
Returns the expiration time of the token in seconds.

---

## Configuration

The library requires the following environment variables:

- `AUTHWARDEN_KEY`: The secret key used to sign tokens.
- `ACCESS_TOKEN_EXPIRES_IN` (optional): Expiration time for access tokens (default: `15m`).
- `REFRESH_TOKEN_EXPIRES_IN` (optional): Expiration time for refresh tokens (default: `7d`).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Clone the repository.
```
git clone https://github.com/AmaraNecib/authwarden.git
```
4. Create a new branch for your feature or bugfix.
```
git checkout -b feature-name
```
6. Commit your changes.
```git commit -m "Add new feature"
git push origin feature-name
```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/AmaraNecib/authwarden).

---

## Acknowledgments

- Built with ❤️ by Amara Necib.
- Inspired by [JWT](https://jwt.io/) and other authentication libraries.
