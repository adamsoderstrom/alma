import { Sym } from '@thi.ng/shader-ast';

import { IConnectionSerialized } from '../Connection/Connection.types';
import { INodeSerialized } from '../Node/Node.types';

export interface IKnownUniforms {
    mouse: Sym<'vec2'>;
    time: Sym<'float'>;
    resolution: Sym<'vec2'>;
}

export type IUniforms = IKnownUniforms & {
    [key: string]: Sym<any>;
};

export interface IContextProps {
    id?: string;
    name?: string;
    root?: INodeSerialized;
    nodes?: [string, INodeSerialized][];
}

export interface IContextSerialized {
    id: string;
    name: string;
    nodes: [string, INodeSerialized][];
    connections: [string, IConnectionSerialized<any>][];
}
