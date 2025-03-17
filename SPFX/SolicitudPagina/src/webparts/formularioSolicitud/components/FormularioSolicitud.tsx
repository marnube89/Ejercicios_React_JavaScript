import * as React from 'react';
// import styles from './FormularioSolicitud.module.scss';
import type { IFormularioSolicitudProps } from './IFormularioSolicitudProps';
import { Button, Field, Textarea, Input } from '@fluentui/react-components'
import { DatePicker } from '@fluentui/react';

export default class FormularioSolicitud extends React.Component<IFormularioSolicitudProps> {
  public render(): React.ReactElement<IFormularioSolicitudProps> {
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
