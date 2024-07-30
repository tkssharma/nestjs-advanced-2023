import * as argon from 'argon2';
import * as crypto from 'crypto';

// Define a class for password hashing and verification
export class PasswordHash {
  // Function to hash data with Argon2 and a pepper
  static async hashData(data: string) {
    // Generate a cryptographically secure random salt
    const salt = crypto.randomBytes(32);

    // Use a pepper for additional security. The pepper is a secret key stored separately from the database.
    // In case the database is compromised, the pepper can prevent an attacker from cracking the passwords.
    const pepper = process.env.PEPPER || 'my-super-secret-pepper';

    // Hash the data with Argon2, using the salt and pepper
    // Argon2 allows for customizable security parameters:
    // - timeCost: computational cost
    // - memoryCost: memory usage
    // - parallelism: number of threads and/or independent memory lanes
    // - type: Argon2 variant (Argon2i, Argon2d, or Argon2id)
    return await argon.hash(data + pepper, {
      salt: salt,
      timeCost: 4, // increase time cost to make it more secure
      memoryCost: 4096, // increase memory cost to make it more secure
      parallelism: 2, // adjust a parallelism factor according to your server's capabilities
      type: argon.argon2id, // use Argon id variant for a balance between security and side-channel attack resistance
    });
  }

  // Function to verify a password with Argon2 and a pepper
  static async verifyPassword(hash: string, password: string) {
    // Use the same pepper as in the hashData function
    const pepper = process.env.PEPPER || 'my-super-secret-pepper';

    // Verify the password with Argon2 and the pepper
    // The password entered by the user is concatenated with the pepper and then compared to the stored hash
    return await argon.verify(hash, password + pepper);
  }
  static async hashRefreshToken(rt: string) {
    // Use the same pepper as in the hashData function
    const pepper = process.env.PEPPER || 'my-super-secret-pepper';

    // Hash the refresh token with Argon2 and the pepper
    return await argon.hash(rt + pepper);
  }
}
