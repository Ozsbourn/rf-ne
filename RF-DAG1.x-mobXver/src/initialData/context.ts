


const contextExample: string = `/'
This code example isn't same for init 
data's in canvas. That's difference needed to 
give you two ways for test this draft: 
  1. start with wysiwyg editor
  2. start with puml editor

Service may ignore some data for non context diagrams rn, 
that's existed possible bug of all-in-one version of node
'/


@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

LAYOUT_WITH_LEGEND()

title Диаграмма контекста системы Поколение-М

Person(guest, "Гость", "Потенциальный пользователь системы Поколение-М")
Person(student, "Студент", "Проходит обучение используя ресурсы и возможности системы")
Person(teacher, "Преподаватель", "Осуществляет преподавательскую деятельность с помощью системы")
Person(support, "СотрудникПоддержки", "Обеспечивает функционирование, техническую поддержку системы")
Person(admin, "Администратор", "Управляет пользователями, учебными материалами, состоянием активностей и курсов")

System(sys, "Система Поколение-М", "Предоставляет образовательные программы и курсы для детей и подростков")

Person(testPerson, "Test Person", "Test description (Not sure that person can be linked w/ other Person in Puml)")

Rel(guest, sys, "Просматривает доступные курсы, регистрируется в")
Rel(student, sys, "Проходит обучение по курсам, сдает дом.работы, оценивает курс в")
Rel(teacher, sys, "Проводит трансляции, проверяет домашние работы или задания по конкурсам в")
Rel(support, sys, "Управляет учетными записями пользователей, назначением курсов, формированием образовательной программы в")
Rel(admin, sys, "Управляет правами, создает курсы/уроки в")
Rel(testPerson, admin, "Set label in Puml editor")

@enduml`;


export default contextExample;