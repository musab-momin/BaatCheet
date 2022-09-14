import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';


const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write something...',
  wrapperClass = "",
  // emptyMssg = 'Input is empty',
  ...inptProps
}) => {

  const [input, setInput] = useState(initialValue)
  const [isEditable, setIsEditable] = useState(false);

  // In rsuit we directly get value from input field so we don't need to do this event.target.value
  const handleInputChange = useCallback((value) =>{
    setInput(value)
  }, [])

  const handleClick = useCallback(()=>{
    setIsEditable(!isEditable)
    setInput(initialValue)
  }, [initialValue, isEditable])

  const onSaveClick = async() =>{
    const trimmedValue = input.trim();

    if(trimmedValue === ''){
      Alert.info('Please write something', 3000);
    }

    if(trimmedValue !== initialValue){
      await onSave(trimmedValue);
    }
    setIsEditable(false);
  }

  return(
  <div className={ wrapperClass  }>
    {label}
    <InputGroup>
      <Input {...inptProps}  disabled={ !isEditable } placeholder = { placeholder } onChange={ handleInputChange } value={ input } />
      <InputGroup.Button onClick={handleClick}>
        <Icon icon={ isEditable ? 'close' : 'edit2' } />      
      </InputGroup.Button>
      { isEditable 
      &&  
      <InputGroup.Button onClick={onSaveClick}>
        <Icon icon='check' />      
      </InputGroup.Button>
      }
    </InputGroup>
  </div>)
};

export default EditableInput;
