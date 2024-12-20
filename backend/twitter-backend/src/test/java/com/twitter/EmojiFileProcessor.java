package com.twitter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EmojiFileProcessor {


    public void test() {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            objectMapper.configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, false);
            objectMapper.configure(SerializationFeature.WRITE_SINGLE_ELEM_ARRAYS_UNWRAPPED, false);

            try {
                // Read the original JSON file
                Map<String, List<Map<String, Object>>> originalData = objectMapper.readValue(
                        new File("/Users/nakhuda1/Downloads/original_emojis.json"),
                        new TypeReference<Map<String, List<Map<String, Object>>>>() {});

                // Prepare a map to hold combined emojis by base name
                Map<String, Map<String, Object>> combinedEmojis = new HashMap<>();

                // Process each emoji
                for (Map<String, Object> emoji : originalData.get("emojis")) {
                    String name = (String) emoji.get("name");

                    String baseName;
                    if ("Flags".equals(emoji.get("category"))) {
                        baseName = name; // Keep the entire name for flags
                    } else {
                        baseName = name.split(":")[0].trim(); // Default base name extraction without skin tone
                    }
                    // String baseName = name.split(":")[0].trim(); // Get base name without skin tone

                    // Initialize the entry if it doesn't exist
                    Map<String, Object> combined = combinedEmojis.getOrDefault(baseName, new HashMap<>());

                    // Set common properties if it's the first occurrence
                    if (!combinedEmojis.containsKey(baseName)) {
                        combined.put("emoji", emoji.get("emoji")); // Default emoji
                        combined.put("name", baseName);
                        combined.put("category", emoji.get("category"));
                        combined.put("subcategory", emoji.get("subcategory"));

                        // Extract the support information
//                    Map<String, Object> support = (Map<String, Object>) emoji.get("support");
//                    combined.put("support", support);

                        // Initialize the images list
                        List<String> imageList = new ArrayList<>();
                        Map<String, Object> images = (Map<String, Object>) emoji.get("images");

                        // Check if images exist and iterate through them
                        if (images != null) {
                            for (Map.Entry<String, Object> entry : images.entrySet()) {
                                // Check if the value is a String (valid image)
                                if (entry.getValue() instanceof String) {
                                    // Add the first valid image found
                                    imageList.add((String) entry.getValue());
                                    break; // Only take one image
                                } else if (entry.getValue() instanceof Boolean && !(Boolean) entry.getValue()) {
                                    // If the device does not support the emoji, you can skip adding anything
                                    continue;
                                }
                            }
                        }

                        // Ensure that the imageList is populated correctly
                        if (imageList.isEmpty()) {
                            imageList.add(""); // Optional: leave it empty or add a placeholder string
                        }

                        // Set the images in the combined emoji map
                        combined.put("images", imageList); // images should be an
                        combined.put("modifiers", new ArrayList<String>()); // Initialize modifiers
                    }

                    // Check for skin tone and add the emoji to modifiers
                    if (name.contains("skin tone")) {
                        // Add the emoji to modifiers list
                        List<String> modifiers = (List<String>) combined.get("modifiers");
                        modifiers.add((String) emoji.get("emoji"));

                        // Add corresponding modifier images to the main emoji's images list
                        List<String> imageList = (List<String>) combined.get("images");
                        Map<String, Object> images = (Map<String, Object>) emoji.get("images");

                        // Check if modifier has images and add to the images list
                        if (images != null) {
                            for (Map.Entry<String, Object> entry : images.entrySet()) {
                                if (entry.getValue() instanceof String) {
                                    imageList.add((String) entry.getValue()); // Add image for modifier
                                    break; // Only take one image
                                }
                            }
                        }
                    }

                    // Update the combinedEmojis map
                    combinedEmojis.put(baseName, combined);
                }

                // Create the final JSON structure
                List<Map<String, Object>> finalEmojis = new ArrayList<>(combinedEmojis.values());
                Map<String, Object> finalJson = new HashMap<>();
                finalJson.put("emojis", finalEmojis);

                // Write the new JSON file with UTF-8 encoding
                try (Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("/Users/nakhuda1/Desktop/Work/Development/Personal/EmojiConvertorProcess/output/combined_emojis.json"), StandardCharsets.UTF_8))) {
                    objectMapper.writerWithDefaultPrettyPrinter().writeValue(writer, finalJson);
                }

                System.out.println("Combined JSON structure created successfully in 'combined_emojis.json'.");

            } catch (IOException e) {
                e.printStackTrace();
            }
        }


}
