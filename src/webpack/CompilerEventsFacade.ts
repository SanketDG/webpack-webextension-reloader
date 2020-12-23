import { Compiler, Compilation } from "webpack";

export default class CompilerEventsFacade {
  public static extensionName = "webpack-extension-reloader";
  private _compiler: Compiler;

  constructor(compiler) {
    this._compiler = compiler;
  }

  public afterOptimizeChunkAssets(call) {
    return this._compiler.hooks.compilation.tap(
      CompilerEventsFacade.extensionName,
      comp =>
        comp.hooks.processAssets.tap(
          {
            name: CompilerEventsFacade.extensionName,
            stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED,
          },
          assets => call(comp, assets),
        ),
    );
  }

  public afterEmit(call) {
    return this._compiler.hooks.afterEmit.tap(
      CompilerEventsFacade.extensionName,
      call,
    );
  }
}
