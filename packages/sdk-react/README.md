# Connect Checkout SDK

#### Installing Checkout SDK

```bash
npm install @cometh/checkout-sdk-react
```

### Basic Usage

1. Initialize SDK

```typescript
import {useCheckout} from '@cometh/checkout-sdk-react'

const {startCheckout, success, error} = useCheckout(apiKey)
```

2. Start checkout flow

```typescript
const request = {
    productId: 1,
    user: {
        walletAddress: '0x1234567890',
        email: 'test@email.com'
    }
}

await startCheckout(request)
```

3. Handle Results

```ts
import {useEffect} from "react";

useEffect(() => {
    if (success) {
        console.log('checkout success', success)
    }
    if (error) {
        console.log('checkout error', error)
    }
}, [success, error]);
```