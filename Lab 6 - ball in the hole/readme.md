## Ball in the hole
Narysuj na stronie w losowym położeniu na stronie kulkę (okrąg) i dziurę. Może być zwykły div, może być canvas lub svg - bez znaczenia.  
Poruszając urządzeniem mobilnym (lub symulując ruch w przeglądarce) naprowadź kulkę do dziury. Zmierz czas, zapisz listę rekordów.

### Jedna dziurka
Jedna kulka, jedna dziurka - ile razy w przeciągu minuty uda się naprowadzić kulkę do dziury?

### Wiele dziurek
Jedna kulka, wiele dziurek - w jakim czasie przejdziesz dziury po kolei? Początkowe ułożenie dziur jest losowe.

### Czarna dziura
Niektóre dziury wciągają kulkę i wypluwają ją w innym miejscu. Inne dziury są ruchome - dojdź do celu w najszybszym czasie

### Przydatne
> Obserwowanie pochylenia telefonu: window.addEventListener('deviceorientation', cb)  
> W evencie mamy właściwości alpha, beta, gamma - określają pochylenie w każdej z osi. Uwaga na zakresy wartości (są różne dla różnych osi).  
> Testowanie aplikacji: przeglądarka, sekcja Sensors w narzędziach dla developerów  
> Animację oprzyj o requestAnimationFrame
