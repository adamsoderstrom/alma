import { float, Prim, step } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from 'alma-graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { IStepNodeInputs, IStepNodeOutputs, IStepNodeProps } from './StepNode.types';

export class StepNode extends PolymorphicNode {
    static icon = 'horizontal_distribute';
    static description = 'Generates a step function by comparing input to edge.';

    static nodeName = 'Step';
    type = WebGLNodeType.STEP;

    inputs: IStepNodeInputs;
    outputs: IStepNodeOutputs;

    constructor(circuit: Circuit, props: IStepNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'float',
                    options: ['float', 'vec2', 'vec3', 'vec4']
                }
            }
        });

        super(circuit, props);

        this.inputs = {
            edge: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.edge, {
                    name: 'Edge',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            input: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.input, {
                    name: 'Input',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            output: new Output(
                this,
                defaults<Partial<IOutputProps<Prim>> | undefined, IOutputProps<Prim>>(props.outputs?.output, {
                    name: 'Output',
                    type: 'float',
                    value: () => {
                        return step<Prim, Prim>(
                            this.resolveValue(this.inputs.edge.value),
                            this.resolveValue(this.inputs.input.value)
                        );
                    }
                })
            )
        };
    }
}
