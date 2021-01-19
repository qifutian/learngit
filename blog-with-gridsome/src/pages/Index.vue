<template>
   <div> 
      <Layout>
         <!-- Page Header -->
        <header class="masthead" style="background-image: url('img/home-bg.jpg')">
          <div class="overlay"></div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 col-md-10 mx-auto">
                <div class="site-heading">
                  <h1>Clean Blog</h1>
                  <span class="subheading">A Blog Theme by Start Bootstrap</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
              <div class="post-preview" v-for="edge in $page.posts.edges" :key="edge.node.id">
                <a href="post.html">
                  <h2 class="post-title">
                   {{edge.node.title}}
                  </h2>
                  
                </a>
                <p class="post-meta">Posted by
                  <a href="#">{{edge.node.created_by.firstname}}</a>
                  on September 24, 2019</p>
              </div>
              <hr>

              <div class="clearfix">
                <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>  
</template>

<script>

<page-query>
  query ($page: Int) {
  posts: allStrapiPost(perPage: 10, page: $page) @paginate {
      edges{
      node{
        id
        path
        title
        created_by{
          id
          firstname
          lastname
        }
        tags{
          id
          title
        }
      } 
      }
  }
}


</page-query>
export default {
  metaInfo: {
    title: 'Blog'
  },
  name: 'IndexPage'
}
</script>

<style>

</style>
