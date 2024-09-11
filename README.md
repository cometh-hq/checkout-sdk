# Connect Checkout SDK

#### Installing Checkout SDK

```bash
npm install @cometh/checkout-sdk
```

### Basic Usage

1. Initialize SDK

```typescript
import {CheckoutSDK} from '@cometh/checkout-sdk'

const sdk = new CheckoutSDK(apiKey)
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

await sdk.checkout(request)
```

3. Handle flow events

```ts
import {CheckoutSDK, CheckoutError, CheckoutSuccess} from '@cometh/checkout-sdk'

const sdk = new CheckoutSDK(apiKey)
sdk.on('start', () => {
    console.log('display is ON and flow has started');
});

sdk.on('success', (result: CheckoutSuccess) => {
});

sdk.on('failure', (error: CheckoutError) => {
});
```