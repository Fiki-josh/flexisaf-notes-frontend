import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapters = createEntityAdapter({
    sortComparer: (a,b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = notesAdapters.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
            getNotes: builder.query({
                query: () => ({
                    url: '/notes',
                    vaildateStatus: (response,result) => {
                        return response.status === 200 && !result.isError
                    }
                }),
                transformResponse: (responseData) =>{
                    const loadedData = responseData.map(note => {
                        note.id = note._id
                        return note
                    })
                    return notesAdapters.setAll(initialState,loadedData)
                },
                providesTags: (result, error, arg) => {
                    if(result?.ids){
                        return [
                            {type: 'Note', id:'List'},
                            ...result.ids.map(id => ({type: 'Note', id}))
                        ]
                    }else return [{type: 'Note', id:'List'}]
                }
            }),
            addNewNote: builder.mutation({
                query: initialNoteData => ({
                    url: '/notes',
                    method: 'POST',
                    body: {...initialNoteData}
                }),
                invalidatesTags: [{type: 'Note', id: 'List'}]
            }),
            updateNote: builder.mutation({
                query: initialNoteData => ({
                    url: '/notes',
                    method: 'PATCH',
                    body: {...initialNoteData}
                }),
                invalidatesTags: (result,error, arg) => [{type: 'Note', id: arg.id}]
            }), 
            deleteNote: builder.mutation({
                query: ({id}) => ({
                    url: '/notes',
                    method: 'DELETE',
                    body: {id}
                }),
                invalidatesTags: (result,error, arg) => [{type: 'Note', id: arg.id}]
            })
        })
})

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApiSlice

//get all notes selector
export const selectNoteResult = notesApiSlice.endpoints.getNotes.select()

// create memoize selectors
const selectNoteData = createSelector(
    selectNoteResult,
    noteResult => noteResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapters.getSelectors(state => selectNoteData(state) ?? initialState)
