export enum DisplayMode {
    REDIRECT_CURRENT = 'redirect-current',
    TAB = 'tab',
    IFRAME = 'iframe',
    POPUP = 'popup'
}


export interface CheckoutConfiguration {
    checkoutAppURI?: string
    display?: DisplayMode
}