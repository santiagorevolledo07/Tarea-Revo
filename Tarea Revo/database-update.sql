-- 1. Crear la tabla de CanalesContacto
CREATE TABLE CanalesContacto (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

-- 2. Insertar algunos canales de ejemplo
INSERT INTO CanalesContacto (Nombre) VALUES 
('Correo Electrónico'), 
('Teléfono'), 
('WhatsApp');

-- 3. Agregar la columna CanalId a Personas como llave foránea
ALTER TABLE Personas ADD CanalId INT NULL;
ALTER TABLE Personas ADD CONSTRAINT FK_Persona_Canal FOREIGN KEY (CanalId) REFERENCES CanalesContacto(Id);
