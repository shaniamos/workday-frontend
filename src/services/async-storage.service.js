
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}


function query(entityType, delay = 3000) {

    var entities = JSON.parse(localStorage.getItem(entityType))
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

async function get(entityType, entityId) {
    try {
        const entities = await query(entityType)
        if (!entityId) return entities[0]
        return entities.find(entity => entity._id === entityId)
    } catch (err) {
        throw err
    }
}

function postMany(entityType, entities) {
    _save(entityType, entities)
    return Promise.resolve(entities)
}

async function post(entityType, newEntity) {
    try {
        newEntity._id = _makeId()
        const entities = await query(entityType)
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    } catch (err) {
        throw err
    }
}

async function put(entityType, updatedEntity) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    } catch (err) {
        throw err
    }
}

async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === entityId)
        entities.splice(idx, 1)
        _save(entityType, entities)
    } catch (err) {
        throw err
    }
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}