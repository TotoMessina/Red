// profile.js
async function cargarPerfil() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("bio").value = usuario.bio || "";
  
    const { data: publicaciones } = await supabase
      .from("publicaciones")
      .select("*")
      .eq("user_id", usuario.id)
      .order("created_at", { ascending: false });
  
    const contenedor = document.getElementById("mis-posts");
    publicaciones.forEach(p => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `<p>${p.contenido}</p>`;
      contenedor.appendChild(div);
    });
  }
  
  async function actualizarPerfil() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const nombre = document.getElementById("nombre").value;
    const bio = document.getElementById("bio").value;
  
    const { data, error } = await supabase
      .from("usuarios")
      .update({ nombre, bio })
      .eq("id", usuario.id);
  
    if (!error) {
      alert("Perfil actualizado");
      usuario.nombre = nombre;
      usuario.bio = bio;
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      alert("Error al actualizar");
    }
  }
  