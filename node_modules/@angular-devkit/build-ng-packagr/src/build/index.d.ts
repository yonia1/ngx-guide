/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BuildEvent, Builder, BuilderConfiguration, BuilderContext } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
export interface NgPackagrBuilderOptions {
    project: string;
    tsConfig?: string;
}
export declare class NgPackagrBuilder implements Builder<NgPackagrBuilderOptions> {
    context: BuilderContext;
    constructor(context: BuilderContext);
    run(builderConfig: BuilderConfiguration<NgPackagrBuilderOptions>): Observable<BuildEvent>;
}
export default NgPackagrBuilder;
