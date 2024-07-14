// DropdownSelect.js
import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropdownSelect = ({
  isOpen,
  toggle,
  title,
  items,
  selectedItems,
  onSearchChange,
  searchTerm,
  onSelectItem,
  clearSelection
}) => (
  <Dropdown isOpen={isOpen} toggle={toggle}>
    <DropdownToggle caret>{title}</DropdownToggle>
    <DropdownMenu>
      {onSearchChange && (
        <DropdownItem>
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={onSearchChange}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownItem>
      )}
      <DropdownItem onClick={clearSelection}>Limpiar selección</DropdownItem>
      {items.map((item) => (
        <DropdownItem
          key={item.id}
          onClick={() => onSelectItem(item.id)}
          style={{ backgroundColor: selectedItems.includes(item.id) ? "#f0f0f0" : "transparent" }}
        >
          {item.name}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

export default DropdownSelect;
