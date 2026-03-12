import zipfile
import os

# Ruta del archivo ZIP
ruta_zip = "fotos_vacaciones.zip"

# Carpeta donde se extraerá el contenido
carpeta_destino = "fotos_vacaciones_zip_unzipped"

# Crear la carpeta si no existe
if not os.path.exists(carpeta_destino):
    os.makedirs(carpeta_destino)

# Descomprimir el ZIP
with zipfile.ZipFile(ruta_zip, 'r') as zip_ref:
    zip_ref.extractall(carpeta_destino)

print(f"El contenido se ha extraído en: {carpeta_destino}")
