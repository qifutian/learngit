<template>
  <Layout>

    <div>
        <h1>post page</h1>
        <h1>{{$page.post.title}}</h1>
        <h1>{{$page.post.content}}</h1>

    </div>
  </Layout>

</template>


<page-query>
   query($id: ID!){
       post (id: $id){
           id
           title
           content
       }
   }

</page-query>


<script>
export default {
  name: 'PostPage'
}
</script>

<style>

</style>