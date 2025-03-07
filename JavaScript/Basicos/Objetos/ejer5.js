var obj

obj = {
    DisplayName : 'Obj',
    StaticName: 'ejem-Obj',
    Type : true,
    Group : 2
}

var {DisplayName, StaticName} = obj;
console.log(
`<Field>
    <DisplayName>${DisplayName}</DisplayName>
    <StaticName>${StaticName}</StaticName>
</Field>`
);

