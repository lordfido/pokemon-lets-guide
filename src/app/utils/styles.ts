import { create as createJss } from 'jss';
// @ts-ignore
import camelCase from 'jss-camel-case';
// @ts-ignore
import defaultUnit from 'jss-default-unit';
// @ts-ignore
import nested from 'jss-nested';
// @ts-ignore
import vendorPrefixer from 'jss-vendor-prefixer';
import injectSheet from 'react-jss';

const jss = createJss();
jss.use(nested(), camelCase(), defaultUnit(), vendorPrefixer());

export const getJss = () => jss;

interface ICssClass {
  [K: string]: string | number | boolean | ICssClass;
}
interface ISheet {
  [K: string]: ICssClass;
}
interface IClassNames<S> {
  [keys: string]: S;
}

export const createSheet = (s: IClassNames<ISheet>) => s;
