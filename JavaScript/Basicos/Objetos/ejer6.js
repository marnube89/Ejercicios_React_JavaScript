var obj = {
    DisplayName : 'Obj',
    StaticName: 'ejem-Obj',
    Type : true,
    Group : 2
}
var copia = obj

copia.DisplayName = 'Copia'
copia.StaticName = 'ejem-Copia'
copia.Group = 5

console.log(obj)
console.log(copia)