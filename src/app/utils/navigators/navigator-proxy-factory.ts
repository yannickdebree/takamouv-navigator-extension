import { NavigatorProxy } from "../types";
import { ChromeNavigatorProxy, FakeNavigatorProxy } from "./proxies";

export default function navigatorProxyFactory(): NavigatorProxy {
    if (ChromeNavigatorProxy.isAvailable()) {
        return new ChromeNavigatorProxy();
    }
    return new FakeNavigatorProxy();
}