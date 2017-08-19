import { buildClientSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import * as introspectionResult from '~/schema.json'
console.log(introspectionResult)

export default function makeWithMockedProvider(mocks) {
  const schema = buildClientSchema(introspectionResult)

  addMockFunctionsToSchema({
    schema,
    mocks,
  })

  const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema })

  const client = new ApolloClient({
    networkInterface: mockNetworkInterface,
  })

  return children =>
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
}
