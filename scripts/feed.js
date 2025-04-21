async function cargarFeed() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const contenedor = document.getElementById("feed");
  
    const { data: seguidos } = await supabase
      .from("seguidores")
      .select("seguido_id")
      .eq("seguidor_id", usuario.id);
  
    const ids = seguidos.length > 0 ? seguidos.map(s => s.seguido_id) : null;
  
    let query = supabase
      .from("publicaciones")
      .select("*, usuarios(nombre)")
      .order("created_at", { ascending: false });
  
    if (ids) {
      query = query.in("user_id", ids);
    }
  
    const { data: publicaciones } = await query;
  
    contenedor.innerHTML = "";
    publicaciones.forEach(p => {
      const post = document.createElement("div");
      post.className = "post";
      post.innerHTML = `<h3>${p.usuarios.nombre}</h3><p>${p.contenido}</p>`;
      contenedor.appendChild(post);
    });
  }
  
  async function publicar() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const contenido = document.getElementById("contenido").value;
    if (!contenido) return alert("Escribí algo");
  
    await supabase.from("publicaciones").insert([
      { user_id: usuario.id, contenido }
    ]);
  
    document.getElementById("contenido").value = "";
    cargarFeed();
  }
  