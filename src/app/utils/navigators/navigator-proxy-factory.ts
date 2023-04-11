import { ChromeNavigatorProxy, FakeNavigatorProxy } from "./proxies";

export default function navigatorProxyFactory() {
    if (ChromeNavigatorProxy.isAvailable()) {
        return new ChromeNavigatorProxy();
    }
    return new FakeNavigatorProxy();
}