import { AuthFlowType, InitiateAuthCommand, InitiateAuthCommandInput, InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { User } from "/core/auth/domain/entity/user.entity";
import { client } from "./cognito.client.config";
import { AuthRepository } from "/core/auth/domain/repository/auth.repository";
import { createHmac } from 'crypto'

export class CognitoAuthRepository implements AuthRepository {
  async signIn(user: User): Promise<InitiateAuthCommandOutput> {
    const input: InitiateAuthCommandInput = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: user.email,
        PASSWORD: user.password,
        SECRET_HASH: generateSecretHash(process.env.COGNITO_APP_CLIENT_ID, user.email, process.env.COGNITO_APP_CLIENT_SECRET)
      },
      ClientId: process.env.COGNITO_APP_CLIENT_ID
    };
    const command = new InitiateAuthCommand(input)
    const response = await client.send(command)
    return response
  }
}

function generateSecretHash(clientId, username, clientSecret) {
  const hmac = createHmac('sha256', process.env.COGNITO_APP_CLIENT_SECRET)
  hmac.update(`${username}${clientId}`)
  const secretHash = hmac.digest('base64')
  return secretHash
}
