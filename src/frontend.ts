document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll<HTMLButtonElement>('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-text');
            const copiedText = this.getAttribute('data-copied-text');
            const originalText = this.textContent;
            
            if (!textToCopy || !copiedText || !originalText) {
                console.error('Missing required attributes');
                return;
            }
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Change button text and add copied class
                this.textContent = copiedText;
                this.classList.add('copied');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
}); 