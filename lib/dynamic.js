'use client'

import { DynamicWidget as OriginalDynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core'
export * from '@dynamic-labs/sdk-react-core'
export * from '@dynamic-labs/ethereum'

export const DynamicWidget = (props) => {
  return (
    <OriginalDynamicWidget 
      {...props}
      variant="modal"
      innerSettings={{
        verifyEmailSettings: {
          enabled: false
        }
      }}
    />
  )
}
