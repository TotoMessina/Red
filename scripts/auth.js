async function registrar(nombre, email, contraseña) {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nombre, email, contraseña }]);
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Registro exitoso");
      window.location.href = "login.html";
    }
  }
  
  async function login(email, contraseña) {
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .eq("contraseña", contraseña)
      .single();
  
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
      window.location.href = "index.html";
    } else {
      alert("Credenciales incorrectas");
    }
  }
  