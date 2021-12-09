// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    category,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    {
      name: 'Blog',
      title: 'Blog',
      type: 'document', 
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation:(Rule) => {return Rule.required().min(5).max(15)}
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type:'string'
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'string',
         
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          fields: [{
            name: 'alt',
            title: 'description',
            type:'text'
          }],
          options: {
            hotspot:true
          }
        },
        {

          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type:'block'
            },
            {
              type: 'image',
              fields: [
                {

                  name: 'position',
                  title: 'Position',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'center', value: 'center' },
                       { title: 'left', value: 'left' },
                        {title:'right',value:'right'}
                    ],
                    layout: 'radio',
                    isHighlighted:true
                  }
                 
                  
                   
                  
                },
                {
                  name: 'alt',
                  title: 'Description',
                  type: 'text',
                  options: {
                    isHighlighted: true
                  }
                },
                
              ],
               options: {
                hotspot: true
              }
            },
            {
              type: 'code',
              options: {
                withFilename:true
              }
            }

          ]
        },
        {
          name: 'authorimage',
          title: 'AuthorImage',
          type: 'reference',
           validation:(Rule) => {return Rule.required()},
          to: [{
            type:'avatar'
          }]
        },
        {
          name: 'date',
          title: 'Date',
          type: 'datetime',
          validation:(Rule) => {return Rule.required()}
}

        
      ]
    
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image'
        },
        {
          name: 'date',
          title: 'Date',
          type:'datetime'

        }
      ]
    }
  ]),
})
