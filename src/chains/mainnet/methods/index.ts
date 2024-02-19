import { Method } from '@/types';
import { web3Methods } from './web3';
import { netMethods } from './net';
import { ethMethods } from './eth';

export const jsonRPCMethods: Method[] = [...web3Methods, ...netMethods, ...ethMethods];
