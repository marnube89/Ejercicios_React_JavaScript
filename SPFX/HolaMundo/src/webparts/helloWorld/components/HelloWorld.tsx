import * as React from 'react';
//import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
import { Button, Field, Textarea, Input } from '@fluentui/react-components'
import { DatePicker } from '@fluentui/react';
//import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactElement<IHelloWorldProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;

    return (
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'10pt'}}>
        <Field label='Titulo de la pagina'>
          <Input />
        </Field>
        <Field label='Descripcion de la pagina'>
          <Textarea/>
        </Field>
        <Field label='Fecha de peticion'>
          <DatePicker/>
        </Field>
        <Button>Confirmar</Button>
      </div>
    );
  }
}
