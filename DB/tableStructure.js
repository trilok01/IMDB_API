const movie_data_type = {
    name: 'varchar(200)',
    plot: 'varchar(200)',
    release_date: 'date',
    producer_id: 'integer(4)'
}

const actor_data_type = {
    name: 'varchar(200)',
    bio: 'varchar(200)',
    dob: 'date',
    gender: 'varchar(20)'
}

const producer_data_type = {
    name: 'varchar(200)',
    bio: 'varchar(200)',
    dob: 'date',
    gender: 'varchar(20)',
    company: 'varchar(200)'
}

module.exports = {movie_data_type, actor_data_type, producer_data_type};