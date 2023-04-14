import { CommandRunnerParams, Failable, NavigatorProxy } from "../../types";

export default class FakeNavigatorProxy implements NavigatorProxy {
    runCommand<Args extends any[]>(_commandRunnerParams: CommandRunnerParams<Args>): Promise<Failable> {
        return Promise.resolve(new Error("Navigator command runner is only available on production"));
    }
}