export enum DisplayMode {
    TAB = 'tab',
    IFRAME = 'iframe',
    POPUP = 'popup'
}


export interface CheckoutConfiguration {
    checkoutAppURI?: string
    display?: DisplayMode
}