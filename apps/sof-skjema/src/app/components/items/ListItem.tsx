import { FC, useState, useEffect } from 'react';
import { Xknapp } from 'nav-frontend-ikonknapper';
import { useInputErrorContext } from '../../context/inputErrorContext';

/**
 * ListItem is a component that renders a list of elements.
 * Currently used together with the InputItem-component.
 * @returns A list of elements, with the possibility to remove elements from the list of elements
 */

export const ListItem: FC<IListItemProps> = ({ valueList, setValueList }) => {
  const [tempValue, setTempValue] = useState(''); // The current text value of the clicked element
  const [isValueChanged, setIsValueChanged] = useState(false); // Updates if the tempValue is changed
  const { setCheckedForError } = useInputErrorContext();

  const handleOnClick = (value: string) => {
    setTempValue(value);
    setIsValueChanged(true);
    setCheckedForError && setCheckedForError(false);
  };

  // Update list of elements
  useEffect(() => {
    const copiedList: string[] = [...valueList];
    // Checks if the element is in the list before removing it
    if (copiedList.indexOf(tempValue) >= 0) {
      copiedList.splice(copiedList.indexOf(tempValue), 1);
    }
    setValueList(copiedList);
    setIsValueChanged(false);
  }, [isValueChanged]);

  return (
    <>
      {valueList?.map((value: string, index: number) => {
        return (
          <div
            key={value + index}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Xknapp mini onClick={() => handleOnClick(value)} />
            <p className="typo-normal">{value}</p>
          </div>
        );
      })}
    </>
  );
};
