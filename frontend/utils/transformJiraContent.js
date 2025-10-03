export function transformJiraContent(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  doc.querySelectorAll("ac\\:image").forEach((acImage) => {
    const attachment = acImage.querySelector("ri\\:attachment");
    if (!attachment) return;

    const filename = attachment.getAttribute("ri:filename");

    // local URL
    const imgUrl = `/images/projects/${filename}`;

    // Create image
    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = attachment.getAttribute("ac:alt") || filename;
    img.className = "rounded-lg mx-auto my-4 ";

    // Find if ac:image is inside an <a>
    let parentLink = acImage.closest("a");
    let link = document.createElement("a");

    if (parentLink && parentLink.href) {
      link.href = parentLink.href; // use the link that Jira brings
    } else {
      link.href = imgUrl; // if there is no link, link the image itself
    }

    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.appendChild(img);

    acImage.replaceWith(link);
  });

  return doc.body.innerHTML;
}
