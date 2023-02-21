/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AddRole {
        "refresh": any;
        "url": string;
    }
    interface CheckBox {
        "name": string;
    }
    interface ChipsList {
        "removeSearchChip": any;
        "removeSortChip": any;
        "searchChips": {};
        "sortchips": {};
        "togglesort": any;
    }
    interface CodeEditor {
        "onClickRun": Function;
    }
    interface DataTable {
        "doc": object[];
    }
    interface DataTableUpdated {
        "doc": object[];
    }
    interface DialogComponent {
        "permissions": string;
        "url": string;
    }
    interface DropDown {
        "alias": string;
        "clearSearch": any;
        "searchMethod": any;
    }
    interface EditUser {
        "ismodelopen": boolean;
        "submiturl": string;
        "toggle": () => void;
        "url": string;
        "userid": number;
        "value": string;
    }
    interface EditorJsonResponseViewer {
        "doc": any;
    }
    interface EditorPage {
        "url": string;
    }
    interface EditorRes {
    }
    interface FluidContainer {
    }
    interface IconButton {
        "addClass": string;
        "btnLabel": string;
        "iconPosition": 'right' | 'left';
        "type": 'outlined' | 'contained';
    }
    interface InviteComponent {
        "apiurl": string;
        "email": string;
        "url": string;
    }
    interface JsonResponseViewer {
        "doc": any;
        "responseLabel": 'result' | 'error';
    }
    interface LoaderComponent {
    }
    interface LogTableWrapper {
        "api": any;
        "autocompute": boolean;
        "headerList": object[];
        "rowPerPage": number[];
    }
    interface LogsTable {
        "clearSearch": any;
        "currentPage": number;
        "dataLength": string;
        "isLoading": boolean;
        "isLoadingError": boolean;
        "limit": number;
        "next": any;
        "prev": any;
        "rows": number[];
        "rowsHandler": any;
        "searchMethod": any;
        "tableBody": object[];
        "tableHeader": object[];
        "toggleSortMethod": any;
    }
    interface MenuDropDown {
        "fetchData": any;
        "list": string[];
        "listTitle": string;
    }
    interface MenuItems {
    }
    interface MultiSelectChoicesJs {
        "handleselect": any;
        "items": string[];
        "roles": any;
        "submiturl": string;
        "toggle": () => void;
        "url": string;
        "userid": number;
        "value": string;
    }
    interface MultiSelectCustom {
        "roles": string[];
        "selected": string[];
    }
    interface NavBar {
    }
    interface NavigatorsComponent {
        "navigators": string;
        "permissions": string;
    }
    interface NodeItem {
    }
    interface PermissionEditor {
        "permissions": string;
        "url": string;
    }
    interface PlainButton {
        "addClass": string;
        "clickHandler": any;
        "color": string;
        "disabledHandler": boolean;
        "hoverColor": string;
        "type": 'contained' | 'outlined' | 'text';
        "width": 'full' | 'auto';
    }
    interface QueryLogs {
    }
    interface QueryResultTable {
        "clearSearch": any;
        "currentPage": number;
        "dataLength": string;
        "isLoadingError": boolean;
        "limit": number;
        "next": any;
        "prev": any;
        "rows": number[];
        "rowsHandler": any;
        "searchMethod": any;
        "tableBody": object[];
        "tableHeader": object[];
        "toggleSortMethod": any;
    }
    interface RadioButton {
        "align": 'vertical' | 'horizontal';
        "name": string;
    }
    interface RadioButtonMultiple {
        "align": 'vertical' | 'horizontal';
        "checked": string;
        "clickHandler": any;
        "label": string;
        "labels": string[];
        "name": string;
    }
    interface SideBar {
        "permissions": string;
        "url": string;
    }
    interface TabComponent {
    }
    interface TableSearchModal {
        "alias": string;
        "clearSearch": any;
        "icon": any;
        "refresh": any;
        "searchMethod": any;
        "type": string;
        "url": string;
    }
    interface TabsComponent {
        "activeIndex": number;
        "tabClickHandler": any;
        "tabslist": { name: string; className: string }[];
    }
    interface TextField {
        "addClass": string;
        "eye": boolean;
        "name": string;
        "onChange": any;
        "onClick": any;
        "placeholder": string;
        "type": 'email' | 'password' | 'text' | 'search';
    }
    interface TextFieldArea {
        "addClass": string;
        "width": 'full' | 'auto';
    }
    interface UserDropDown {
        "email": string;
        "option": string[];
        "submiturl": string;
        "url": string;
        "userId": number;
    }
    interface UsersComponent {
        "permissions": string;
        "submiturl": string;
        "url": string;
        "users": any;
    }
}
declare global {
    interface HTMLAddRoleElement extends Components.AddRole, HTMLStencilElement {
    }
    var HTMLAddRoleElement: {
        prototype: HTMLAddRoleElement;
        new (): HTMLAddRoleElement;
    };
    interface HTMLCheckBoxElement extends Components.CheckBox, HTMLStencilElement {
    }
    var HTMLCheckBoxElement: {
        prototype: HTMLCheckBoxElement;
        new (): HTMLCheckBoxElement;
    };
    interface HTMLChipsListElement extends Components.ChipsList, HTMLStencilElement {
    }
    var HTMLChipsListElement: {
        prototype: HTMLChipsListElement;
        new (): HTMLChipsListElement;
    };
    interface HTMLCodeEditorElement extends Components.CodeEditor, HTMLStencilElement {
    }
    var HTMLCodeEditorElement: {
        prototype: HTMLCodeEditorElement;
        new (): HTMLCodeEditorElement;
    };
    interface HTMLDataTableElement extends Components.DataTable, HTMLStencilElement {
    }
    var HTMLDataTableElement: {
        prototype: HTMLDataTableElement;
        new (): HTMLDataTableElement;
    };
    interface HTMLDataTableUpdatedElement extends Components.DataTableUpdated, HTMLStencilElement {
    }
    var HTMLDataTableUpdatedElement: {
        prototype: HTMLDataTableUpdatedElement;
        new (): HTMLDataTableUpdatedElement;
    };
    interface HTMLDialogComponentElement extends Components.DialogComponent, HTMLStencilElement {
    }
    var HTMLDialogComponentElement: {
        prototype: HTMLDialogComponentElement;
        new (): HTMLDialogComponentElement;
    };
    interface HTMLDropDownElement extends Components.DropDown, HTMLStencilElement {
    }
    var HTMLDropDownElement: {
        prototype: HTMLDropDownElement;
        new (): HTMLDropDownElement;
    };
    interface HTMLEditUserElement extends Components.EditUser, HTMLStencilElement {
    }
    var HTMLEditUserElement: {
        prototype: HTMLEditUserElement;
        new (): HTMLEditUserElement;
    };
    interface HTMLEditorJsonResponseViewerElement extends Components.EditorJsonResponseViewer, HTMLStencilElement {
    }
    var HTMLEditorJsonResponseViewerElement: {
        prototype: HTMLEditorJsonResponseViewerElement;
        new (): HTMLEditorJsonResponseViewerElement;
    };
    interface HTMLEditorPageElement extends Components.EditorPage, HTMLStencilElement {
    }
    var HTMLEditorPageElement: {
        prototype: HTMLEditorPageElement;
        new (): HTMLEditorPageElement;
    };
    interface HTMLEditorResElement extends Components.EditorRes, HTMLStencilElement {
    }
    var HTMLEditorResElement: {
        prototype: HTMLEditorResElement;
        new (): HTMLEditorResElement;
    };
    interface HTMLFluidContainerElement extends Components.FluidContainer, HTMLStencilElement {
    }
    var HTMLFluidContainerElement: {
        prototype: HTMLFluidContainerElement;
        new (): HTMLFluidContainerElement;
    };
    interface HTMLIconButtonElement extends Components.IconButton, HTMLStencilElement {
    }
    var HTMLIconButtonElement: {
        prototype: HTMLIconButtonElement;
        new (): HTMLIconButtonElement;
    };
    interface HTMLInviteComponentElement extends Components.InviteComponent, HTMLStencilElement {
    }
    var HTMLInviteComponentElement: {
        prototype: HTMLInviteComponentElement;
        new (): HTMLInviteComponentElement;
    };
    interface HTMLJsonResponseViewerElement extends Components.JsonResponseViewer, HTMLStencilElement {
    }
    var HTMLJsonResponseViewerElement: {
        prototype: HTMLJsonResponseViewerElement;
        new (): HTMLJsonResponseViewerElement;
    };
    interface HTMLLoaderComponentElement extends Components.LoaderComponent, HTMLStencilElement {
    }
    var HTMLLoaderComponentElement: {
        prototype: HTMLLoaderComponentElement;
        new (): HTMLLoaderComponentElement;
    };
    interface HTMLLogTableWrapperElement extends Components.LogTableWrapper, HTMLStencilElement {
    }
    var HTMLLogTableWrapperElement: {
        prototype: HTMLLogTableWrapperElement;
        new (): HTMLLogTableWrapperElement;
    };
    interface HTMLLogsTableElement extends Components.LogsTable, HTMLStencilElement {
    }
    var HTMLLogsTableElement: {
        prototype: HTMLLogsTableElement;
        new (): HTMLLogsTableElement;
    };
    interface HTMLMenuDropDownElement extends Components.MenuDropDown, HTMLStencilElement {
    }
    var HTMLMenuDropDownElement: {
        prototype: HTMLMenuDropDownElement;
        new (): HTMLMenuDropDownElement;
    };
    interface HTMLMenuItemsElement extends Components.MenuItems, HTMLStencilElement {
    }
    var HTMLMenuItemsElement: {
        prototype: HTMLMenuItemsElement;
        new (): HTMLMenuItemsElement;
    };
    interface HTMLMultiSelectChoicesJsElement extends Components.MultiSelectChoicesJs, HTMLStencilElement {
    }
    var HTMLMultiSelectChoicesJsElement: {
        prototype: HTMLMultiSelectChoicesJsElement;
        new (): HTMLMultiSelectChoicesJsElement;
    };
    interface HTMLMultiSelectCustomElement extends Components.MultiSelectCustom, HTMLStencilElement {
    }
    var HTMLMultiSelectCustomElement: {
        prototype: HTMLMultiSelectCustomElement;
        new (): HTMLMultiSelectCustomElement;
    };
    interface HTMLNavBarElement extends Components.NavBar, HTMLStencilElement {
    }
    var HTMLNavBarElement: {
        prototype: HTMLNavBarElement;
        new (): HTMLNavBarElement;
    };
    interface HTMLNavigatorsComponentElement extends Components.NavigatorsComponent, HTMLStencilElement {
    }
    var HTMLNavigatorsComponentElement: {
        prototype: HTMLNavigatorsComponentElement;
        new (): HTMLNavigatorsComponentElement;
    };
    interface HTMLNodeItemElement extends Components.NodeItem, HTMLStencilElement {
    }
    var HTMLNodeItemElement: {
        prototype: HTMLNodeItemElement;
        new (): HTMLNodeItemElement;
    };
    interface HTMLPermissionEditorElement extends Components.PermissionEditor, HTMLStencilElement {
    }
    var HTMLPermissionEditorElement: {
        prototype: HTMLPermissionEditorElement;
        new (): HTMLPermissionEditorElement;
    };
    interface HTMLPlainButtonElement extends Components.PlainButton, HTMLStencilElement {
    }
    var HTMLPlainButtonElement: {
        prototype: HTMLPlainButtonElement;
        new (): HTMLPlainButtonElement;
    };
    interface HTMLQueryLogsElement extends Components.QueryLogs, HTMLStencilElement {
    }
    var HTMLQueryLogsElement: {
        prototype: HTMLQueryLogsElement;
        new (): HTMLQueryLogsElement;
    };
    interface HTMLQueryResultTableElement extends Components.QueryResultTable, HTMLStencilElement {
    }
    var HTMLQueryResultTableElement: {
        prototype: HTMLQueryResultTableElement;
        new (): HTMLQueryResultTableElement;
    };
    interface HTMLRadioButtonElement extends Components.RadioButton, HTMLStencilElement {
    }
    var HTMLRadioButtonElement: {
        prototype: HTMLRadioButtonElement;
        new (): HTMLRadioButtonElement;
    };
    interface HTMLRadioButtonMultipleElement extends Components.RadioButtonMultiple, HTMLStencilElement {
    }
    var HTMLRadioButtonMultipleElement: {
        prototype: HTMLRadioButtonMultipleElement;
        new (): HTMLRadioButtonMultipleElement;
    };
    interface HTMLSideBarElement extends Components.SideBar, HTMLStencilElement {
    }
    var HTMLSideBarElement: {
        prototype: HTMLSideBarElement;
        new (): HTMLSideBarElement;
    };
    interface HTMLTabComponentElement extends Components.TabComponent, HTMLStencilElement {
    }
    var HTMLTabComponentElement: {
        prototype: HTMLTabComponentElement;
        new (): HTMLTabComponentElement;
    };
    interface HTMLTableSearchModalElement extends Components.TableSearchModal, HTMLStencilElement {
    }
    var HTMLTableSearchModalElement: {
        prototype: HTMLTableSearchModalElement;
        new (): HTMLTableSearchModalElement;
    };
    interface HTMLTabsComponentElement extends Components.TabsComponent, HTMLStencilElement {
    }
    var HTMLTabsComponentElement: {
        prototype: HTMLTabsComponentElement;
        new (): HTMLTabsComponentElement;
    };
    interface HTMLTextFieldElement extends Components.TextField, HTMLStencilElement {
    }
    var HTMLTextFieldElement: {
        prototype: HTMLTextFieldElement;
        new (): HTMLTextFieldElement;
    };
    interface HTMLTextFieldAreaElement extends Components.TextFieldArea, HTMLStencilElement {
    }
    var HTMLTextFieldAreaElement: {
        prototype: HTMLTextFieldAreaElement;
        new (): HTMLTextFieldAreaElement;
    };
    interface HTMLUserDropDownElement extends Components.UserDropDown, HTMLStencilElement {
    }
    var HTMLUserDropDownElement: {
        prototype: HTMLUserDropDownElement;
        new (): HTMLUserDropDownElement;
    };
    interface HTMLUsersComponentElement extends Components.UsersComponent, HTMLStencilElement {
    }
    var HTMLUsersComponentElement: {
        prototype: HTMLUsersComponentElement;
        new (): HTMLUsersComponentElement;
    };
    interface HTMLElementTagNameMap {
        "add-role": HTMLAddRoleElement;
        "check-box": HTMLCheckBoxElement;
        "chips-list": HTMLChipsListElement;
        "code-editor": HTMLCodeEditorElement;
        "data-table": HTMLDataTableElement;
        "data-table-updated": HTMLDataTableUpdatedElement;
        "dialog-component": HTMLDialogComponentElement;
        "drop-down": HTMLDropDownElement;
        "edit-user": HTMLEditUserElement;
        "editor-json-response-viewer": HTMLEditorJsonResponseViewerElement;
        "editor-page": HTMLEditorPageElement;
        "editor-res": HTMLEditorResElement;
        "fluid-container": HTMLFluidContainerElement;
        "icon-button": HTMLIconButtonElement;
        "invite-component": HTMLInviteComponentElement;
        "json-response-viewer": HTMLJsonResponseViewerElement;
        "loader-component": HTMLLoaderComponentElement;
        "log-table-wrapper": HTMLLogTableWrapperElement;
        "logs-table": HTMLLogsTableElement;
        "menu-drop-down": HTMLMenuDropDownElement;
        "menu-items": HTMLMenuItemsElement;
        "multi-select-choices-js": HTMLMultiSelectChoicesJsElement;
        "multi-select-custom": HTMLMultiSelectCustomElement;
        "nav-bar": HTMLNavBarElement;
        "navigators-component": HTMLNavigatorsComponentElement;
        "node-item": HTMLNodeItemElement;
        "permission-editor": HTMLPermissionEditorElement;
        "plain-button": HTMLPlainButtonElement;
        "query-logs": HTMLQueryLogsElement;
        "query-result-table": HTMLQueryResultTableElement;
        "radio-button": HTMLRadioButtonElement;
        "radio-button-multiple": HTMLRadioButtonMultipleElement;
        "side-bar": HTMLSideBarElement;
        "tab-component": HTMLTabComponentElement;
        "table-search-modal": HTMLTableSearchModalElement;
        "tabs-component": HTMLTabsComponentElement;
        "text-field": HTMLTextFieldElement;
        "text-field-area": HTMLTextFieldAreaElement;
        "user-drop-down": HTMLUserDropDownElement;
        "users-component": HTMLUsersComponentElement;
    }
}
declare namespace LocalJSX {
    interface AddRole {
        "refresh"?: any;
        "url"?: string;
    }
    interface CheckBox {
        "name"?: string;
    }
    interface ChipsList {
        "removeSearchChip"?: any;
        "removeSortChip"?: any;
        "searchChips"?: {};
        "sortchips"?: {};
        "togglesort"?: any;
    }
    interface CodeEditor {
        "onClickRun"?: Function;
    }
    interface DataTable {
        "doc"?: object[];
    }
    interface DataTableUpdated {
        "doc"?: object[];
    }
    interface DialogComponent {
        "permissions"?: string;
        "url"?: string;
    }
    interface DropDown {
        "alias"?: string;
        "clearSearch"?: any;
        "searchMethod"?: any;
    }
    interface EditUser {
        "ismodelopen"?: boolean;
        "submiturl"?: string;
        "toggle"?: () => void;
        "url"?: string;
        "userid"?: number;
        "value"?: string;
    }
    interface EditorJsonResponseViewer {
        "doc"?: any;
    }
    interface EditorPage {
        "url"?: string;
    }
    interface EditorRes {
    }
    interface FluidContainer {
    }
    interface IconButton {
        "addClass"?: string;
        "btnLabel"?: string;
        "iconPosition"?: 'right' | 'left';
        "type"?: 'outlined' | 'contained';
    }
    interface InviteComponent {
        "apiurl"?: string;
        "email"?: string;
        "url"?: string;
    }
    interface JsonResponseViewer {
        "doc"?: any;
        "responseLabel"?: 'result' | 'error';
    }
    interface LoaderComponent {
    }
    interface LogTableWrapper {
        "api"?: any;
        "autocompute"?: boolean;
        "headerList"?: object[];
        "rowPerPage"?: number[];
    }
    interface LogsTable {
        "clearSearch"?: any;
        "currentPage"?: number;
        "dataLength"?: string;
        "isLoading"?: boolean;
        "isLoadingError"?: boolean;
        "limit"?: number;
        "next"?: any;
        "prev"?: any;
        "rows"?: number[];
        "rowsHandler"?: any;
        "searchMethod"?: any;
        "tableBody"?: object[];
        "tableHeader"?: object[];
        "toggleSortMethod"?: any;
    }
    interface MenuDropDown {
        "fetchData"?: any;
        "list"?: string[];
        "listTitle"?: string;
    }
    interface MenuItems {
    }
    interface MultiSelectChoicesJs {
        "handleselect"?: any;
        "items"?: string[];
        "roles"?: any;
        "submiturl"?: string;
        "toggle"?: () => void;
        "url"?: string;
        "userid"?: number;
        "value"?: string;
    }
    interface MultiSelectCustom {
        "roles"?: string[];
        "selected"?: string[];
    }
    interface NavBar {
    }
    interface NavigatorsComponent {
        "navigators"?: string;
        "permissions"?: string;
    }
    interface NodeItem {
    }
    interface PermissionEditor {
        "permissions"?: string;
        "url"?: string;
    }
    interface PlainButton {
        "addClass"?: string;
        "clickHandler"?: any;
        "color"?: string;
        "disabledHandler"?: boolean;
        "hoverColor"?: string;
        "type"?: 'contained' | 'outlined' | 'text';
        "width"?: 'full' | 'auto';
    }
    interface QueryLogs {
    }
    interface QueryResultTable {
        "clearSearch"?: any;
        "currentPage"?: number;
        "dataLength"?: string;
        "isLoadingError"?: boolean;
        "limit"?: number;
        "next"?: any;
        "prev"?: any;
        "rows"?: number[];
        "rowsHandler"?: any;
        "searchMethod"?: any;
        "tableBody"?: object[];
        "tableHeader"?: object[];
        "toggleSortMethod"?: any;
    }
    interface RadioButton {
        "align"?: 'vertical' | 'horizontal';
        "name"?: string;
    }
    interface RadioButtonMultiple {
        "align"?: 'vertical' | 'horizontal';
        "checked"?: string;
        "clickHandler"?: any;
        "label"?: string;
        "labels"?: string[];
        "name"?: string;
    }
    interface SideBar {
        "permissions"?: string;
        "url"?: string;
    }
    interface TabComponent {
    }
    interface TableSearchModal {
        "alias"?: string;
        "clearSearch"?: any;
        "icon"?: any;
        "refresh"?: any;
        "searchMethod"?: any;
        "type"?: string;
        "url"?: string;
    }
    interface TabsComponent {
        "activeIndex"?: number;
        "tabClickHandler"?: any;
        "tabslist"?: { name: string; className: string }[];
    }
    interface TextField {
        "addClass"?: string;
        "eye"?: boolean;
        "name"?: string;
        "onChange"?: any;
        "onClick"?: any;
        "placeholder"?: string;
        "type"?: 'email' | 'password' | 'text' | 'search';
    }
    interface TextFieldArea {
        "addClass"?: string;
        "width"?: 'full' | 'auto';
    }
    interface UserDropDown {
        "email"?: string;
        "option"?: string[];
        "submiturl"?: string;
        "url"?: string;
        "userId"?: number;
    }
    interface UsersComponent {
        "permissions"?: string;
        "submiturl"?: string;
        "url"?: string;
        "users"?: any;
    }
    interface IntrinsicElements {
        "add-role": AddRole;
        "check-box": CheckBox;
        "chips-list": ChipsList;
        "code-editor": CodeEditor;
        "data-table": DataTable;
        "data-table-updated": DataTableUpdated;
        "dialog-component": DialogComponent;
        "drop-down": DropDown;
        "edit-user": EditUser;
        "editor-json-response-viewer": EditorJsonResponseViewer;
        "editor-page": EditorPage;
        "editor-res": EditorRes;
        "fluid-container": FluidContainer;
        "icon-button": IconButton;
        "invite-component": InviteComponent;
        "json-response-viewer": JsonResponseViewer;
        "loader-component": LoaderComponent;
        "log-table-wrapper": LogTableWrapper;
        "logs-table": LogsTable;
        "menu-drop-down": MenuDropDown;
        "menu-items": MenuItems;
        "multi-select-choices-js": MultiSelectChoicesJs;
        "multi-select-custom": MultiSelectCustom;
        "nav-bar": NavBar;
        "navigators-component": NavigatorsComponent;
        "node-item": NodeItem;
        "permission-editor": PermissionEditor;
        "plain-button": PlainButton;
        "query-logs": QueryLogs;
        "query-result-table": QueryResultTable;
        "radio-button": RadioButton;
        "radio-button-multiple": RadioButtonMultiple;
        "side-bar": SideBar;
        "tab-component": TabComponent;
        "table-search-modal": TableSearchModal;
        "tabs-component": TabsComponent;
        "text-field": TextField;
        "text-field-area": TextFieldArea;
        "user-drop-down": UserDropDown;
        "users-component": UsersComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "add-role": LocalJSX.AddRole & JSXBase.HTMLAttributes<HTMLAddRoleElement>;
            "check-box": LocalJSX.CheckBox & JSXBase.HTMLAttributes<HTMLCheckBoxElement>;
            "chips-list": LocalJSX.ChipsList & JSXBase.HTMLAttributes<HTMLChipsListElement>;
            "code-editor": LocalJSX.CodeEditor & JSXBase.HTMLAttributes<HTMLCodeEditorElement>;
            "data-table": LocalJSX.DataTable & JSXBase.HTMLAttributes<HTMLDataTableElement>;
            "data-table-updated": LocalJSX.DataTableUpdated & JSXBase.HTMLAttributes<HTMLDataTableUpdatedElement>;
            "dialog-component": LocalJSX.DialogComponent & JSXBase.HTMLAttributes<HTMLDialogComponentElement>;
            "drop-down": LocalJSX.DropDown & JSXBase.HTMLAttributes<HTMLDropDownElement>;
            "edit-user": LocalJSX.EditUser & JSXBase.HTMLAttributes<HTMLEditUserElement>;
            "editor-json-response-viewer": LocalJSX.EditorJsonResponseViewer & JSXBase.HTMLAttributes<HTMLEditorJsonResponseViewerElement>;
            "editor-page": LocalJSX.EditorPage & JSXBase.HTMLAttributes<HTMLEditorPageElement>;
            "editor-res": LocalJSX.EditorRes & JSXBase.HTMLAttributes<HTMLEditorResElement>;
            "fluid-container": LocalJSX.FluidContainer & JSXBase.HTMLAttributes<HTMLFluidContainerElement>;
            "icon-button": LocalJSX.IconButton & JSXBase.HTMLAttributes<HTMLIconButtonElement>;
            "invite-component": LocalJSX.InviteComponent & JSXBase.HTMLAttributes<HTMLInviteComponentElement>;
            "json-response-viewer": LocalJSX.JsonResponseViewer & JSXBase.HTMLAttributes<HTMLJsonResponseViewerElement>;
            "loader-component": LocalJSX.LoaderComponent & JSXBase.HTMLAttributes<HTMLLoaderComponentElement>;
            "log-table-wrapper": LocalJSX.LogTableWrapper & JSXBase.HTMLAttributes<HTMLLogTableWrapperElement>;
            "logs-table": LocalJSX.LogsTable & JSXBase.HTMLAttributes<HTMLLogsTableElement>;
            "menu-drop-down": LocalJSX.MenuDropDown & JSXBase.HTMLAttributes<HTMLMenuDropDownElement>;
            "menu-items": LocalJSX.MenuItems & JSXBase.HTMLAttributes<HTMLMenuItemsElement>;
            "multi-select-choices-js": LocalJSX.MultiSelectChoicesJs & JSXBase.HTMLAttributes<HTMLMultiSelectChoicesJsElement>;
            "multi-select-custom": LocalJSX.MultiSelectCustom & JSXBase.HTMLAttributes<HTMLMultiSelectCustomElement>;
            "nav-bar": LocalJSX.NavBar & JSXBase.HTMLAttributes<HTMLNavBarElement>;
            "navigators-component": LocalJSX.NavigatorsComponent & JSXBase.HTMLAttributes<HTMLNavigatorsComponentElement>;
            "node-item": LocalJSX.NodeItem & JSXBase.HTMLAttributes<HTMLNodeItemElement>;
            "permission-editor": LocalJSX.PermissionEditor & JSXBase.HTMLAttributes<HTMLPermissionEditorElement>;
            "plain-button": LocalJSX.PlainButton & JSXBase.HTMLAttributes<HTMLPlainButtonElement>;
            "query-logs": LocalJSX.QueryLogs & JSXBase.HTMLAttributes<HTMLQueryLogsElement>;
            "query-result-table": LocalJSX.QueryResultTable & JSXBase.HTMLAttributes<HTMLQueryResultTableElement>;
            "radio-button": LocalJSX.RadioButton & JSXBase.HTMLAttributes<HTMLRadioButtonElement>;
            "radio-button-multiple": LocalJSX.RadioButtonMultiple & JSXBase.HTMLAttributes<HTMLRadioButtonMultipleElement>;
            "side-bar": LocalJSX.SideBar & JSXBase.HTMLAttributes<HTMLSideBarElement>;
            "tab-component": LocalJSX.TabComponent & JSXBase.HTMLAttributes<HTMLTabComponentElement>;
            "table-search-modal": LocalJSX.TableSearchModal & JSXBase.HTMLAttributes<HTMLTableSearchModalElement>;
            "tabs-component": LocalJSX.TabsComponent & JSXBase.HTMLAttributes<HTMLTabsComponentElement>;
            "text-field": LocalJSX.TextField & JSXBase.HTMLAttributes<HTMLTextFieldElement>;
            "text-field-area": LocalJSX.TextFieldArea & JSXBase.HTMLAttributes<HTMLTextFieldAreaElement>;
            "user-drop-down": LocalJSX.UserDropDown & JSXBase.HTMLAttributes<HTMLUserDropDownElement>;
            "users-component": LocalJSX.UsersComponent & JSXBase.HTMLAttributes<HTMLUsersComponentElement>;
        }
    }
}
