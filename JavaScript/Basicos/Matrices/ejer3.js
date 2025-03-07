var arr = []

arr = [
    obj1 = {
        DisplayName : 'Obj1',
        StaticName : 'ejem-Obj-1',
        Type : true,
        Group : 2
    },
    obj2 = {
        DisplayName : 'Obj2',
        StaticName : 'ejem-Obj-2',
        Type : false,
        Group : 2
    },
    obj3 = {
        DisplayName : 'Obj3',
        StaticName : 'ejem-Obj-3',
        Type : true,
        Group : 5
    },
    obj4 = {
        DisplayName : 'Obj3',
        StaticName : 'ejem-Obj-3',
        Type : true,
        Group : 5
    },
    obj5 = {
        DisplayName : 'Obj3',
        StaticName : 'ejem-Obj-3',
        Type : true,
        Group : 5
    },
    obj6 = {
        DisplayName : 'Obj3',
        StaticName : 'ejem-Obj-3',
        Type : true,
        Group : 5
    },
    obj7 = {
        DisplayName : 'Obj3',
        StaticName : 'ejem-Obj-3',
        Type : true,
        Group : 5
    },
    obj8 = {
        DisplayName : 'Obj3',
        StaticName : 'ejem-Obj-3',
        Type : true,
        Group : 5
    },
    obj9 = {
        DisplayName : 'Obj3',
        StaticName : 'ejem-Obj-3',
        Type : true,
        Group : 5
    },
    obj10 = {
        DisplayName : 'Obj3',
        StaticName : 'ejem-Obj-3',
        Type : true,
        Group : 5
    }
]

//where
let where = arr.filter((valor) => valor.Type === true)

//ForEach
arr.forEach((valor) => console.log(valor))

//Select


//OrderBy
let order = arr.sort((valorA, valorB) => valorA.Group - valorB.Group)

//SingleOrDefault
let result = arr.pop()
