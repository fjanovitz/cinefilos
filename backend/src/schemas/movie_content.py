from pydantic import BaseModel
# banner/imagem, onde está disponível para assistir/comprar e média da avaliação dos usuários
class Movie(BaseModel):
    title: str
    synopsis: str
    gender: str
    duration: int #in minutes
    release_year: int
    director: str
    main_cast: list[str] 