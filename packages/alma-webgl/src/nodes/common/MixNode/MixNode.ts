import { float, mix, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from 'alma-graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { IMixNodeData, IMixNodeInputs, IMixNodeOutputs, IMixNodeProps } from './MixNode.types';

export class MixNode extends PolymorphicNode {
    static icon = 'tonality';
    static description = 'Performs a linear interpolation between A and B using T to weight between them.';
    static nodeName = 'Mix';

    type = WebGLNodeType.MIX;

    inputs: IMixNodeInputs;
    outputs: IMixNodeOutputs;
    data!: IMixNodeData;

    constructor(circuit: Circuit, props: IMixNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'float',
                    options: ['float', 'vec2', 'vec3', 'vec4']
                }
            }
        });

        super(circuit, props, ['a', 'b']);

        const inputA = new Input(
            this,
            defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.a, {
                name: 'A',
                type: 'float',
                defaultValue: float(0)
            })
        );

        const inputB = new Input(
            this,
            defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.b, {
                name: 'B',
                type: 'float',
                defaultValue: float(0)
            })
        );

        this.inputs = {
            a: inputA,
            b: inputB,
            t: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.t, {
                    name: 'T',
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
                    get type() {
                        return inputA.type;
                    },
                    value: () => {
                        return mix<Prim, Prim, Prim>(
                            this.resolveValue(this.inputs.a.value),
                            this.resolveValue(this.inputs.b.value),
                            this.resolveValue(this.inputs.t.value)
                        );
                    }
                })
            )
        };
    }
}
