import * as React from 'react';
import {
  Field,
  Input,
  Switch,
  Select,
  Button,
  List,
  ListItem,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogBody
} from "@fluentui/react-components";
import { DeleteRegular, DocumentRegular } from '@fluentui/react-icons';

import { DatePicker } from '@fluentui/react';
import { RichText } from '@pnp/spfx-controls-react/lib/RichText'
import { IPickerTerms, TaxonomyPicker } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { DragDropFiles } from '@pnp/spfx-controls-react/lib/DragDropFiles'

import styles from './FormGestionGrupos.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import '@pnp/sp/webs'
import '@pnp/sp/site-users/web'
import "@pnp/sp/lists"
import "@pnp/sp/fields";

import useColumnChoices from '../hooks/useColumnChoices';
import useDocumentLibrary from '../hooks/useDocumentLibrary';
import useGroupAuthor from '../hooks/useGroupAuthor';
import { clearTempFolder, deleteFile, saveTempFiles, uploadTemp } from '../modules/FileManager';
import { SubmitedData } from '../modules/SubmitedData';
import useSubmitData from '../hooks/useSubmitData';
import useUserPermission from '../hooks/useUserPermission';


export default function FormGestionGrupos ({ context, groupId }: { context: WebPartContext, groupId?: string }){
  const [formData, setFormData] = React.useState<FormData>(new FormData)
  const initialData = useGroupAuthor(context, groupId)
  let author = ''
  groupId = typeof groupId === 'string' ? groupId : ''
  
  if(initialData !== undefined){
    author = initialData[0].split('?')[0]
    groupId = initialData[1]

    const retrievedData = retrieveFormData(formData, groupId, initialData[0].split('?')[1])
    if(retrievedData !== null){
      let validation = Object.values(retrievedData).every((prop) => {return prop !== null && prop.toString().length > 0})
      if(validation){
        saveTempFiles(context, groupId)
        useSubmitData(context, retrievedData)
        setInterval(() => {window.history.back()}, 1500)
      }else{
        alert('campos vacios')
      }
    }
  }
  
  
    
  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      setFormData(new FormData(document.getElementById('formulario') as HTMLFormElement))
    }} id='formulario'>
        {!useUserPermission(context) ? <PermissionDialog/> : <></>}
        <Header context={context} author={author} groupId={groupId}/>
        <main className={styles['form-main']}>
          <LeftSection formData={formData} setData={setFormData}/>
          <RightSection context={ context } formData={formData} setData={setFormData} groupId={groupId}/>
        </main>
        <footer className={styles['form-footer']}>
            <Button>Eventos del grupo</Button>
        </footer>
    </form>
  );

}

function retrieveFormData(formData: FormData, groupId: string, author: string): SubmitedData | null{
  if(formData.get('estado') === null) formData.set('estado', 'Cerrado');
    if(formData.get('fechaCreacion') !== null && formData.get('denominacion') !== null){
      return {
        idGrupo: groupId,
        denominacion: formData.get('denominacion') as string,
        descripcion: formData.get('descripcion') as string,
        fechaCreacion: new Date(formData.get('fechaCreacion') as string),
        fechaFinalizacion: new Date(formData.get('fechaFinalizacion') as string),
        ambito: formData.get('taxonomiaAmbito') as string,
        ciudad: formData.get('taxonomiaCiudad') as string,
        pais: formData.get('taxonomiaPais') as string,
        estado: formData.get('estado') as string === 'Abierto' ? true : false,
        tematica: formData.get('Tematica') as string,
        tipoGrupo: formData.get('TipoGrupo') as string,
        autor: author
      }
    }
  return null
}

function Header({context, author, groupId} : {context : WebPartContext, author: string, groupId: string}){
  //DUDA: Como hacer propiedades editables dentro de sharepoint
  return(
    <header className={styles['form-header']}>
      <p><b>Creado por: </b>{author}</p>
      <div className={styles['button-group']}>
        <Button type='submit'>Guardar</Button>
        <Button onClick={() => {
          clearTempFolder(context, groupId);
          setInterval(() => {window.history.back()}, 1500)
          }}>
            Cancelar
          </Button>
        <Button>Volver a grupos</Button>
      </div>
    </header>
  )
}

function LeftSection({formData, setData}:{formData: FormData, setData: (data: FormData) => void}){
  return(
    <section className={styles['section-left']}>
        <Field label={<b>Sector</b>}>
          Transporte
        </Field>

        <Field label={<b>Denominacion</b>} required >
          <Input name={'denominacion'}/>
        </Field>

        <RichTextEdit formData={formData} setData={setData} />

        <DateForm formData={formData} setData={setData}/>
    </section>
  )
}

function RichTextEdit({formData, setData}: {formData: FormData, setData: (data: FormData) => void}){
  const [text, setText] = React.useState(' ')
  formData.append('descripcion', text)
  setData(formData)
  return(
    <Field label={<b>Descripcion del grupo</b>}>
          <RichText 
          value={text}
          onChange={(text) => {setText(text); return text}}
          />
    </Field>
  )
}

function DateForm({formData, setData}:{formData: FormData, setData: (data: FormData) => void}){
  const currentDate = new Date(Date.now())
  const [fechaCreacion, setFechaCreacion] = React.useState(currentDate)
  const [fechaFinalizacion, setFechaFinalizacion] = React.useState(currentDate)

  formData.append('fechaCreacion', fechaCreacion.toString())
  formData.append('fechaFinalizacion', fechaFinalizacion.toString())
  setData(formData)
  return(
    <div className={styles['date-picker']}>
      <Field label={<b>Fecha de creacion</b>} required> 
        <DatePicker
          value={fechaCreacion}
          minDate={fechaCreacion}
          onSelectDate={(date: Date) => {setFechaCreacion(date)}}
        />
      </Field>

      <Field label={<b>Fecha de finalizacion</b>} required>
        <DatePicker
          value={fechaCreacion}
          minDate={fechaCreacion}
          onSelectDate={(date: Date) => {setFechaFinalizacion(date)}}
        />
      </Field>
    </div>
  )
}

function RightSection({context, formData, setData, groupId}:{context: WebPartContext, formData: FormData, setData: (data: FormData) => void, groupId: string}){
  return(
    <section className={styles['section-right']}>
        <EstadoSwitch />

        <Selector columnName={'TipoGrupo'} context={context}/>

        <Selector columnName={'Tematica'} context={context}/>

        <TaxonomySelector label='Ambito' termset='Department' context={context} formData={formData} setData={setData}/>

        <TaxonomySelector label='Pais' termset='Department' context={context} formData={formData} setData={setData}/>

        <TaxonomySelector label='Ciudad' termset='Department' context={context} formData={formData} setData={setData}/>

        <DocumentList context={context} groupId={groupId}/>
    </section>
  )
}

function EstadoSwitch(){
  const [checked, setChecked] = React.useState(true)
  let estado = checked ? 'Abierto' : 'Cerrado'

  return (
    <Field label={<b>Estado</b>}>
          <Switch
            label={estado}
            onChange={() => {setChecked(!checked)}}
            defaultChecked
            name='estado'
            value={estado}
          />
        </Field>
  )
}

function DocumentList({context, groupId}:{context: WebPartContext, groupId: string}){
  const {library, loadData} = useDocumentLibrary(context, groupId)
  React.useEffect(() => {loadData()},[groupId.length])

  const mapedLibrary = library !== undefined 
  ? library.length > 0 
    ? (library.map((v) => {
        return <ListItem>{
          <div style={{display: 'flex', gap: '5pt', alignItems: 'center'}}>
            <DocumentRegular />
            {v.Name} 
            <Button 
              appearance='subtle'
              size='small' 
              onClick={() => deleteFile(v, context, loadData)} 
              icon={<DeleteRegular />}
              />
          </div>
        }</ListItem>
      }))
    : <ListItem>No hay documentos adjuntos</ListItem>
  : <ListItem>No hay documentos adjuntos</ListItem>

  return (
    <>
      <Field label={<b>Documentos Adjuntos</b>}>
            <List navigationMode='items'>
              {mapedLibrary}
            </List>
          </Field>
        <FilesDialog context={context} loadData={loadData} groupId={groupId}/>
    </>
  )
}

function TaxonomySelector({label, termset, context, formData, setData}: {
  label: string, 
  termset:string, 
  context: WebPartContext, 
  formData: FormData, 
  setData: (data: FormData) => void}){
    const [term, setTerm] = React.useState('')

    formData.append(`taxonomia${label}`, term)
    setData(formData)

    return (
      <TaxonomyPicker allowMultipleSelections={false}
        termsetNameOrID={termset}
        panelTitle="Selecciona los terminos"
        label={label}
        context={context}
        isTermSetSelectable={false} 
        onChange={(terms: IPickerTerms) => {setTerm(terms[0].name + '?' + terms[0].key)}}
        required
      />
    )
}

function Selector({columnName, context}:{columnName: string, context: WebPartContext}){
  const choices = useColumnChoices(context, columnName)
  
  return(
    <Field label={<b>{columnName}</b>} required>
          <Select name={columnName}>
            {choices.map((value) => {
              return <option>{value}</option>
            })}
          </Select>
    </Field>
  )
}

function FilesDialog ({context, loadData, groupId}:{context: WebPartContext, loadData: () => void, groupId: string}) {
  const [show, setShow] = React.useState(false)

  function handdleDrop(file: File){
    console.log(file);
    
    uploadTemp(file, context, loadData, groupId);
    setShow(false);
  }

  return (
    <>
      <Button onClick={() => {setShow(true)}}>Adjuntar archivo</Button>
      <Dialog open={show}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Adjuntar archivo</DialogTitle>
            <DialogContent>
              <div>
                <DragDropFiles 
                    dropEffect="copy" 
                    enable={true}  
                    iconName="Upload"
                    labelMessage= "Upload"
                    onDrop={(file: File[]) => { 
                      handdleDrop(file[0]) 
                     }}
                    >
                      Arrastra tus archivos aqui
                </DragDropFiles> 

              </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {setShow(false)}}>Cerrar</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  )
}
function PermissionDialog () {
  return (
      <Dialog open>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Informacion</DialogTitle>
            <DialogContent>
              No tienes permisos suficientes para poder acceder a este formulario
            </DialogContent>
            <DialogActions>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
  )
}