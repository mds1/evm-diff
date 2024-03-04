import { Method } from '@/types';
import { ethMethods } from './eth';
import { netMethods } from './net';
import { web3Methods } from './web3';

export const jsonRPCMethods: Method[] = [...web3Methods, ...netMethods, ...ethMethods];
